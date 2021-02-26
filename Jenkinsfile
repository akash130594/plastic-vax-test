pipeline {
    agent any

    stages {
        stage('Build project') {
            agent {
                dockerfile true
            }

            steps {
                sh 'cp -r /plasticwax.sifars.com ${WORKSPACE}'
                archiveArtifacts artifacts: 'plasticwax.sifars.com/', fingerprint: true
            }
        }

        stage('Get artifacts') {
            steps {
                unarchive mapping: ['plasticwax.sifars.com/' : '.']
            }
        }

        stage('Dev Deploy') {
            when {
                branch 'dev'
            }
            steps {
                dir('./plasticwax.sifars.com'){
                    s3Upload(bucket: 'plasticwax.sifars.com', includePathPattern:'**/*')
                }
            }
        }
    }
    post {
        success {
            sh 'rm -rf plasticwax.sifars.com'
        }
    }
}
