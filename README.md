# CSC414 Project

## Prerequisites
* [Docker CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* [Docker Compose](https://docs.docker.com/compose/install/#install-compose)

## Development Environment Setup (Ubuntu 16.04 and Ubuntu 18.04)
```
# Clone Repository
git clone https://github.com/mlaga97/csc414-roject

cd csc414-project

# Start the testing environment
sudo docker-compose up

# Press ctrl-c to stop the development environment
# Run ./reset.sh to delete all data and do all installations and configuration from scratch
```

The React web interface should be available at <http://localhost:3000/> and the API Server should be available at <http://localhost/>. If the React web interface says 'Getting auth data...', you will need to go to <http://localhost/> and select 'Proceed to localhost (unsafe)' or the equivalent for the browser being used.

## Manual Database Access
The database server can be found at localhost:3306 and is accessible either through the `mysql` cli command running on the local system or through a gui such as `mysql-workbench`. Ensure that any table layout changes and default data for all instances are added to the init.sql file.

## Testing Environment Setup (Ubuntu 18.04)
```
# Coming soon!
```
