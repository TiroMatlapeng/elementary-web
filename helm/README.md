# Elementary Web — Helm Deployment Guide

This chart deploys the Elementary website (Next.js + in-cluster PostgreSQL 16)
to a K3s single-node cluster on Hetzner Cloud.

Target node: Hetzner CX22/CX23 (2 vCPU, 4 GB RAM, 40 GB SSD NVMe)
Kubernetes distribution: K3s
Domain: theelementary.co.za (DNS via Cloudflare)

---

## Prerequisites

The following must be installed and running in the cluster before deploying
this chart. Run these commands once per cluster lifetime.

### 1. K3s — install with Traefik disabled

K3s ships with Traefik as the default ingress controller. This chart uses
nginx instead (more widely documented, battle-tested with cert-manager).
Install K3s with Traefik disabled:

```sh
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable=traefik" sh -
```

Copy the kubeconfig to your local machine:

```sh
# On the Hetzner node
cat /etc/rancher/k3s/k3s.yaml

# On your local machine — replace <NODE_IP> with the Hetzner public IP
export KUBECONFIG=~/.kube/elementary-hetzner.yaml
# Paste the k3s.yaml content, then replace:
#   server: https://127.0.0.1:6443
# with:
#   server: https://<NODE_IP>:6443
```

### 2. nginx Ingress Controller

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.3/deploy/static/provider/cloud/deploy.yaml

# Wait for the controller pod to be ready
kubectl -n ingress-nginx wait --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s
```

### 3. cert-manager + Let's Encrypt ClusterIssuer

```sh
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.16.2/cert-manager.yaml

# Wait for cert-manager to be ready
kubectl -n cert-manager wait --for=condition=ready pod \
  --selector=app.kubernetes.io/instance=cert-manager \
  --timeout=120s

# Create the letsencrypt-prod ClusterIssuer
# Replace <YOUR_EMAIL> with a real address — Let's Encrypt sends expiry alerts here
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: <YOUR_EMAIL>
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            ingressClassName: nginx
EOF
```

### 4. DNS — point theelementary.co.za to the node

In Cloudflare DNS, create an A record:

```
Type: A
Name: theelementary.co.za (or @ for apex)
Value: <HETZNER_NODE_PUBLIC_IP>
Proxy: DNS only (grey cloud) for cert-manager HTTP-01 challenge to work
TTL: Auto
```

Let's Encrypt HTTP-01 challenges require direct access to port 80 on the IP.
Cloudflare proxy (orange cloud) can be re-enabled after the certificate is issued.

---

## First deploy

```sh
helm install elementary-web ./helm/elementary-web \
  --namespace elementary \
  --create-namespace \
  --set postgres.password=<STRONG_RANDOM_PASSWORD> \
  --set postgres.user=elementary \
  --set postgres.db=elementary \
  --set app.whatsappNumber=27XXXXXXXXX
```

Alternatively, create a `values-prod.yaml` (do NOT commit this file to git):

```yaml
postgres:
  password: "your-strong-password-here"
  user: "elementary"
  db: "elementary"

app:
  whatsappNumber: "2771XXXXXXX"
```

Then deploy with:

```sh
helm install elementary-web ./helm/elementary-web \
  --namespace elementary \
  --create-namespace \
  -f values-prod.yaml
```

### Verify the deployment

```sh
# Watch all pods come up
kubectl -n elementary get pods -w

# Check the ingress has an IP and TLS secret
kubectl -n elementary get ingress
kubectl -n elementary get certificate
```

---

## Upgrade after a new Docker image is pushed

GitHub Actions automatically builds and pushes to ghcr.io on every push to
`main`. To apply the new image to the running cluster:

```sh
# Re-pull the latest image and restart the deployment
helm upgrade elementary-web ./helm/elementary-web \
  --namespace elementary \
  -f values-prod.yaml

# Or, if you only want to force a pod restart without a chart change:
kubectl -n elementary rollout restart deployment elementary-web
```

### Upgrade with a specific SHA tag (recommended for production)

```sh
helm upgrade elementary-web ./helm/elementary-web \
  --namespace elementary \
  -f values-prod.yaml \
  --set app.image.tag=<GIT_SHA>
```

---

## Checking logs

```sh
# App logs (Next.js)
kubectl -n elementary logs -l app.kubernetes.io/name=elementary-web --follow

# PostgreSQL logs
kubectl -n elementary logs -l app.kubernetes.io/name=elementary-web-postgres --follow

# Ingress controller logs (useful for TLS/cert debugging)
kubectl -n ingress-nginx logs -l app.kubernetes.io/component=controller --follow

# cert-manager logs (if certificate is stuck in Pending)
kubectl -n cert-manager logs -l app=cert-manager --follow
```

---

## Uninstall

```sh
helm uninstall elementary-web --namespace elementary

# WARNING: This deletes the postgres PVC and all data permanently.
# Only run this if you have a backup.
kubectl -n elementary delete pvc elementary-web-postgres-data
```

---

## Cost reference (Hetzner CX22, 2025 pricing)

| Resource         | Monthly cost  |
|------------------|---------------|
| CX22 node        | ~EUR 4.15/mo  |
| IPv4 address     | ~EUR 0.60/mo  |
| 40 GB SSD (incl) | included      |
| Backups (20%)    | ~EUR 0.83/mo  |
| Total estimate   | ~EUR 5.58/mo  |
|                  | ~R112/mo      |

At EUR:ZAR 1:20. Actual rate may vary.

---

## Future scaling considerations

- If traffic grows and you need multi-replica Next.js pods, increase
  `app.replicaCount` in values.yaml. The PostgreSQL pod remains single-replica.
- If you need PostgreSQL HA, migrate to CloudNativePG (CNPG) operator with
  1 primary + 2 standbys. The current in-cluster deployment is suitable for
  low-traffic launch phase only.
- For Longhorn (replicated block storage across multiple K3s nodes), install
  Longhorn and change `postgres.persistence.storageClassName` from `local-path`
  to `longhorn`.
