# Team Up

![N|Solid](http://www.touchline3d.com/sites/default/files/styles/large/public/comingsoon_600x400.png?itok=urVKWPCz)    

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Git flow

| Name | Description |
| --- | --- |
| `@feature(<function>)` | Adding new functionality at the application level |
| `@refactor` | Code refactoring |
| `@update(<function>)` | Functionality Modifications |
| `@docs(<function>)` | Everything related to the documentation |
| `@style` | Correction of typos, formatting |
| `@test<function>` | Everything related to testing |
| `@chore` | Code Maintenance |
| `@remove(<function>)` | All that is related to deletion (functionality, modules, packages, etc.) |
| `@config(<module>)` | Configuration of the database, module, API, etc. |
| `@add/<name_module>` | Adding a module |
| `@update/<name_module>` | Updating the module |
| `@remove/<name_module>` | Removing Module |

## Migrations

After the installation of all modules, it will possible to use db-migrate. If you want to use [db-migrate](https://github.com/db-migrate/node-db-migrate) as local module now you can install it how global module:
```sh
$ npm install -g db-migrate
```
The following command will execute always your local version of db-migrate if you have installed a local version. If it does not find any local version in your current directory it executes the globally installed version.
[db-migrate](https://github.com/db-migrate/node-db-migrate)
 supports the concept of environments.
Enviroment settings are loaded from 
```sh
team-up/config/default.json
```
The --config option can be used to specify the path to your database.json file if it's not in the current working directory.
```sh
db-migrate up --config config/default.json -e dev
```
Project use MySQL, the configuration consists of the following
```sh
"dev": {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "" ,
    "database": "team_up",
    "driver": "mysql",
    "multipleStatements": true,
}
```
The up command executes the migrations of your currently configured migrations directory. More specific the up migrations are being called.
To create a migration, execute db-migrate create with a title. node-db-migrate will create a node module within ./migrations/ which contains the following two exports:
```sh
/* Callback-based version */
exports.up = function (db, callback) {
  db.createTable('some', {
    id: { type: 'int', primaryKey: true },
    name: 'string'
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('some', callback);
};
};
```
##### Create migrations:
```sh
db-migrate --config config/default.json create <migration_name>
```

##### Up migration

```sh
db-migrate --config config/default.json up <migration_name>
```

##### Down migration

```sh
db-migrate --config config/default.json up <migration_name>
```