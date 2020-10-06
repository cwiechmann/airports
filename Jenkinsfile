pipeline {
   agent any

   tools {
      // Install the Maven version configured as "M3" and add it to the path.
      maven "Mvn 3.3.9"
   }
   
  environment {
     registry = "cwiechmann/airports-app"
     registryCredential = 'dockerhub'
     dockerImage = ''
  }

   stages {
      stage('Deploy Airports API') {
         steps {
            sh "mvn clean exec:java"
         }
      }
   }
}
