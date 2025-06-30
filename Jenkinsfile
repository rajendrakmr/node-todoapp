pipeline {
  agent any

  stages {
    stage("Workspace: clean up") {
      steps {
        cleanWs()
      }
    }

    stage('Github: Code pull') {
      steps {
        git branch: "master", url: "https://github.com/cloudwithrk/node-todo-app.git"
      }
    }

    stage("Docker: build image") {
      steps {
        sh "docker build -t node-app ."
      }
    }
   stage("DockerHub: push image") {
      steps {
        withCredentials([usernamePassword(
          credentialsId: "dockerHubCred",
          usernameVariable: 'DOCKER_USERNAME',
          passwordVariable: 'DOCKER_PASSWORD'
        )]) {
          sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
          sh "docker tag node-app:latest ${DOCKER_USERNAME}/node-todo-app:latest"
          sh "docker push ${DOCKER_USERNAME}/node-todo-app:latest"
        }
      }
    }
    stage("DockerCompose: run docker compose") {
       steps{
            sh "docker compose up -d"
       }
    }
      
  }
}
