{{/*
_helpers.tpl — standard Helm template helpers for elementary-web.
*/}}

{{/*
Expand the name of the chart.
*/}}
{{- define "elementary-web.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
Truncates to 63 characters because Kubernetes DNS names cannot be longer.
*/}}
{{- define "elementary-web.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "elementary-web.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels applied to all resources.
*/}}
{{- define "elementary-web.labels" -}}
helm.sh/chart: {{ include "elementary-web.chart" . }}
{{ include "elementary-web.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels — used in matchLabels and pod template labels.
*/}}
{{- define "elementary-web.selectorLabels" -}}
app.kubernetes.io/name: {{ include "elementary-web.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Postgres-specific labels.
*/}}
{{- define "elementary-web.postgresLabels" -}}
helm.sh/chart: {{ include "elementary-web.chart" . }}
app.kubernetes.io/name: {{ include "elementary-web.name" . }}-postgres
app.kubernetes.io/instance: {{ .Release.Name }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Postgres selector labels.
*/}}
{{- define "elementary-web.postgresSelectorLabels" -}}
app.kubernetes.io/name: {{ include "elementary-web.name" . }}-postgres
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Name of the Kubernetes Secret that holds database credentials.
*/}}
{{- define "elementary-web.secretName" -}}
{{- printf "%s-secret" (include "elementary-web.fullname" .) }}
{{- end }}

{{/*
Name of the ConfigMap that holds non-secret env vars.
*/}}
{{- define "elementary-web.configmapName" -}}
{{- printf "%s-config" (include "elementary-web.fullname" .) }}
{{- end }}

{{/*
Name of the PostgreSQL service (used as the DATABASE_URL hostname).
*/}}
{{- define "elementary-web.postgresServiceName" -}}
{{- printf "%s-postgres" (include "elementary-web.fullname" .) }}
{{- end }}

{{/*
Name of the PostgreSQL PVC.
*/}}
{{- define "elementary-web.postgresPvcName" -}}
{{- printf "%s-postgres-data" (include "elementary-web.fullname" .) }}
{{- end }}
