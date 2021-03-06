# Kubescope CLI

Kubescope on the command line

![Kubescope CLI](https://github.com/hharnisc/kubescope-cli/raw/master/kubescope-cli.gif)

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
  - image: hharnisc/kube-scope-cli:9c02f636b8cb6d4f251af3e73d19248c2a31b3e1
    name: kubescope-cli-example
    stdin: true
    tty: true
    volumeMounts:
    - mountPath: /var/run/docker.sock
      name: docker-sock-volume
    env:
    - name: MATCH_NAME
      value: ".*my-app.*"
    - name: SKIP_NAME
      value: ".*POD.*"
    # - name: MATCH_IMAGE
    #   value: ".*my-image.*"
    # - name: SKIP_IMAGE
    #   value: ".*some-image.*"
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

Attach to the running container:

```sh
kubectl attach -it kubescope-cli-example
```

Observe graphs and the detatch with escape sequence `Ctrl+P` followed by `Ctrl+Q`

### Locally

Kubescope CLI can be used locally and connects to the docker socket to collect stats

```sh
MATCH_NAME=.*my_app.* npm start
```
