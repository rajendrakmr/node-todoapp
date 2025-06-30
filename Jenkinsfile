pipeline {
  agent any

  stages {
    stage("Workspace Cleanup") {
      steps {
        cleanWs()
      }
    }

    stage("Git: Clone Repository") {
      steps {
        git branch: "master", url: "https://github.com/cloudwithrk/node-todo-app.git"
      }
    }

    stage("Docker: Build Image") {
      steps {
        sh "docker build -t node-app ."
      }
    }

    stage("DockerHub: Push Image") {
      steps {
        withCredentials([usernamePassword(
          credentialsId: "dockerHubCreds",
          usernameVariable: 'DOCKER_USERNAME',
          passwordVariable: 'DOCKER_PASSWORD'
        )]) {
          sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
          sh "docker tag node-app:latest ${DOCKER_USERNAME}/node-todo-app:latest"
          sh "docker push ${DOCKER_USERNAME}/node-todo-app:latest"
        }
      }
    }

    stage("Docker Compose: Deploy Containers") {
      steps {
        sh "docker compose down && docker compose up -d --build"
      }
    }
  }
  post {
        success {
            emailext (
                from: 'cloudwithrk@gmail.com',
                to: 'rajendraakmr@gmail.com',
                subject: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: "Good news! Job ${env.JOB_NAME} build #${env.BUILD_NUMBER} SUCCESS!\n\nCheck it: ${env.BUILD_URL}"
            )
        }
        failure {
            emailext (
                from: 'cloudwithrk@gmail.com',
                to: 'rajendraakmr@gmail.com',
                subject: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: "Oops! Job ${env.JOB_NAME} build #${env.BUILD_NUMBER} FAILED!\n\nCheck it: ${env.BUILD_URL}"
            )
        }
        always {
            echo "hello cloud with rk"
        }
    }
}
