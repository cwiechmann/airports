pipeline {
   agent any

   tools {
      // Install the Maven version configured as "M3" and add it to the path.
      maven "Mvn 3.3.9"
   }
   
  environment {
     registry = "gustavoapolinario/docker-test"
     registryCredential = 'dockerhub'
     dockerImage = ''
  }

   stages {
      stage('Build Airports Application') {
         steps {
            dir('app/airports') {
               sh '''
                  pwd
                  npm ci
                  npm run build --if-present
                  npm test
               '''
            }
         }
      }
      stage('Building image') {
         steps{
            dir('app/airports') {
               script {
                  dockerImage = docker.build registry + ":$BUILD_NUMBER"
               }
            }
         }
      }
      stage('Deploy Image') {
         steps{
            script {
               docker.withRegistry( '', registryCredential ) {
                  dockerImage.push()
               }
            }
         }
      }
      stage('Deploy Airports API') {
         steps {
            sh "mvn clean exec:java"
         }
      }
   }
}
