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

---

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

---

## Database Redis

`db-exam/redis` 에 위치, `redis:7-alpine` 사용, 6379 포트 사용

**Spring 연결**
```yml
spring:
  data:
    redis:
      host: localhost
      port: 6379
      password: 1234
```

> 필요 시 Docker service 명으로 host 바꾸기

### Execution

#### 개발 모드 실행

```bash
cd db-exam/redis

# 필요 시
chmod +x build_and_start.sh

# dev 모드로 시작
./build_and_start.sh
```

#### 접속 테스트

**접속**
```bash
docker exec -it $(docker ps -aq -f ancestor="my-redis-image:1.0") redis-cli -a 1234 --no-auth-warning

# 키 개수
DBSIZE

# 만료 시간 설정 (TTL)
SET session:user123 "token_abc" EX 3600
TTL session:user123
```

**기본 명령어 실행**
```bash
# 키 존재 확인
EXISTS name

# 키 삭제
DEL name

# 키 생성
SET name "seonghun"

# 키 조회
GET name
```

**수치형 변수 증감 연산**
```bash
SET counter 0

INCR counter
GET counter       # 1

INCRBY counter 5
GET counter       # 6

DECR counter
GET counter       # 5
```

**만료 시간 설정 (TTL)**
```bash
SET session:user123 "token_abc" EX 3600     # 키는 session:user123 이고, value 는 "token_abc" 이며 만료 시간은 3600초
TTL session:user123     # 남은 시간 확인

### MULTI 명령어 사용
# 여러 키 한 번에 설정
MSET key1 "value1" key2 "value2" key3 "value3"

# 여러 키 한 번에 조회
MGET key1 key2 key3

# 모든 키 조회
KEYS *
```

**출력**
```
127.0.0.1:6379> DBSIZE
(integer) 0
127.0.0.1:6379> SET session:user123 "token_abc" EX 3600
OK
127.0.0.1:6379> TTL session:user123
(integer) 3594
```