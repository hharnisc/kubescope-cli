# kubescope-cli

Kubescope on the command line

## Usage

Kubescope CLI can be used in Kubernetes or locally because it connects to the docker socket to collect stats.

### Kubernetes

Kubescope needs access to the docker socket on the host, stdin and a tty. It also needs to be running on the same host that you want to monitor. Here's an example pod spec:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kubescope-cli-example
spec:
  containers:
  - image: hharnisc/kube-scope-cli:hh-test-01
    name: kubescope-cli-example
    stdin: true
    tty: true
    volumeMounts:
    - mountPath: /var/run/docker.sock
      name: docker-sock-volume
    env:
    - name: MATCH_NAME
      value: ".*my-app.*"
    # - name: DOCKER_SOCKET
    #   value: /var/run/docker.sock
  volumes:
  - name: docker-sock-volume
    hostPath:
      path: /var/run/docker.sock
  # pin kubescope to a specific node
  # nodeSelector:
    # kubernetes.io/hostname: minikube
```

### Locally

Kubescope cli can be used locally and connects to the docker socket to collect stats

```sh
MATCH_NAME=.*my_app.* npm start
```
