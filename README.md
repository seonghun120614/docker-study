# Docker Study

도커 연습 레포지토리입니다.

---

## Database MySQL

`db-exam/msyql` 에 위치, `mysql:8.0` 사용

### Execution

#### 개발 모드 실행

```bash
cd db-exam/mysql

# 필요 시
chmod +x build_and_start.sh

# dev 모드로 시작
./build_and_start.sh
```

#### 접속 테스트

**접속**
```bash
# 컨테이너 접속
docker exec -it $(docker ps -aq -f ancestor="my-mysql-image:1.0") mysql -u testuser -p

# DB 접속 및 테이블 존재 확인
SHOW DATABASES;
USE testdb;
SHOW TABLES;
SELECT * FROM test_table1;
```

**출력**
```
mysql> SELECT * FROM test_table1;
+----+-----------------+--------+-----------+
| id | col1            | col2   | available |
+----+-----------------+--------+-----------+
|  1 | Hello           | world! |         1 |
|  2 | 안녕하세요 | hihi   |         0 |
|  3 |                 | .      |         1 |
+----+-----------------+--------+-----------+
3 rows in set (0.00 sec)
```

---

## Database Postgres

`db-exam/postgres` 에 위치, `postgres:16-alpine` 사용, conf 파일은 그때그때 필요 시 공식 문서 참고 후 설정

### Execution

#### 개발 모드 실행

```bash
cd db-exam/postgres

# 필요 시
chmod +x build_and_start.sh

# dev 모드로 시작
./build_and_start.sh
```

#### 접속 테스트

**접속**
```bash
docker exec -it $(docker ps -q -f ancestor=my-postgres-image:1.0) psql -U testuser -d testdb

# tables 확인
\dt
```

**출력**
```
testdb=> \dt
            List of tables
 Schema |    Name     | Type  | Owner 
--------+-------------+-------+-------
 public | test_table1 | table | root
(1 row)
```

---

## Database MariaDB

`db-exam/mariadb` 에 위치, `mariadb:11` 사용, 27017 포트 사용

### Execution

#### 개발 모드 실행

```bash
cd db-exam/mariadb

# 필요 시
chmod +x build_and_start.sh

# dev 모드로 시작
./build_and_start.sh
```

#### 접속 테스트

**접속**
```bash
# 컨테이너 접속
docker exec -it $(docker ps -aq -f ancestor="my-mariadb-image:1.0") mariadb -u testuser -p

# DB 접속 및 테이블 존재 확인
SHOW DATABASES;
USE testdb;
SHOW TABLES;
SELECT * FROM test_table1;
```

**출력**
```
MariaDB [testdb]> select * from test_table1;
+----+-----------------+--------+-----------+
| id | col1            | col2   | available |
+----+-----------------+--------+-----------+
|  1 | Hello           | world! |         1 |
|  2 | 안녕하세요         | hihi   |         0 |
|  3 |                 | .      |         1 |
+----+-----------------+--------+-----------+
3 rows in set (0.013 sec)
```

## Database MongoDB

`db-exam/mariadb` 에 위치, `mongodb:7` 사용, 3307 포트 사용

### Execution
#### 개발 모드 실행

```bash
cd db-exam/mongodb

# 필요 시
chmod +x build_and_start.sh

# dev 모드로 시작
./build_and_start.sh
```

#### 접속 테스트

**접속**
```bash
docker exec -it $(docker ps -aq -f ancestor="my-mongodb-image:1.0") mongosh -u testuser -p 1234 --authenticationDatabase testdb

use testdb

show collections

db.test_table1.find().limit(10).pretty()
```

**출력**
```
testdb> db.test_table1.find().limit(10).pretty()
[
  {
    _id: ObjectId('693e69fc0ecb9c051cb1ddf4'),
    col1: 'HIHIH',
    col2: 'This is a test document',
    available: true
  },
  {
    _id: ObjectId('693e69fc0ecb9c051cb1ddf5'),
    col1: 'unique_value_2',
    col2: 'Second document with longer content',
    available: true
  },
  {
    _id: ObjectId('693e69fc0ecb9c051cb1ddf6'),
    col1: 'unique_value_3',
    col2: 'Third document',
    available: false
  },
  {
    _id: ObjectId('693e69fc0ecb9c051cb1ddf7'),
    col1: 'unique_value_4',
    col2: 'Fourth document with some special characters: !@#$%',
    available: true
  },
  {
    _id: ObjectId('693e69fc0ecb9c051cb1ddf8'),
    col1: 'unique_value_5',
    col2: 'Fifth document',
    available: true
  }
]
```