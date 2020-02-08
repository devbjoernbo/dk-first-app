#!/bin/bash

GIT_REVISON=$(git rev-parse HEAD)

# Build Docker-images
API_SERVER="server"
WEB_CLIENT="client"
WORKER="worker"

IMAGES="$API_SERVER $WEB_CLIENT $WORKER"

for IMAGE in $IMAGES
do
  # Build image
  docker build -t devbjoernbodk/dk-first-app-$IMAGE:$GIT_REVISON ./$IMAGE/Dockerfile ./$IMAGE

  if [ $? = 0 ]
  then
    echo "Succesfully builded $IMAGE:$GIT_REVISON"
  else
    echo "Error during build of image - $IMAGE:$GIT_REVISON"
  fi
done

#  Push images to images dockerhub with latest tag
for IMAGE in $IMAGES
do
  # Build image
  docker push devbjoernbodk/dk-first-app-$IMAGE:latest

  if [ $? = 0 ]
  then
    echo "Succesfully pushed $IMAGE:latest to dockerhub"
  else
    echo "Error during push to dockerhub - $IMAGE:latest"
  fi
done

#  Push images to images dockerhub with git-revision tag
for IMAGE in $IMAGES
do
  # Build image
  docker push devbjoernbodk/dk-first-app-$IMAGE:$GIT_REVISON

  if [ $? = 0 ]
  then
    echo "Succesfully pushed $IMAGE:$GIT_REVISON to dockerhub"
  else
    echo "Error during push to dockerhub - $IMAGE:$GIT_REVISON"
  fi
done

# Apply k8s files to kubernetes
APPLY_FOLDERS=$(ls ./k8s)

for FOLDER in $APPLY_FOLDERS
do
  # Build image
  kubectl apply -f k8s/$FOLDER

  if [ $? = 0 ]
  then
    echo "Succesfully configured or created objects in $FOLDER"
  else
    echo "Error during configuring or creation- $FOLDER"
  fi
done

#  update kubernetes deployments with latest git revision 
DEPLOYMENT_SERVER="server"
DEPLOYMENT_CLIENT="client"
DEPLOYMENT_WORKER="worker"

DEPLOYMENT_UPDATES="$API_SERVER $WEB_CLIENT $WORKER"

for IMAGE in $IMAGES
do
  # update image
  kubectl set image deployments/$IMAGE-deployment $IMAGE=devbjoernbodk/dk-first-app-$IMAGE:$GIT_REVISON

  if [ $? = 0 ]
  then
    echo "Succesfully updated image: $IMAGE"
  else
    echo "Error during updating- $IMAGE"
  fi
done


