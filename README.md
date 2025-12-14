# Docker Study

도커 연습 레포지토리입니다.

## Database MySQL

`db-exam/msyql` 에 위치, `mysql:8.0` 사용

### 실행

```bash
cd db-exam/mysql

# 필요 시
chmod +x build_and_start.sh

# dev 모드로 시작
./build_and_start.sh
```

### 테스트

**접속**
```bash
# 컨테이너 접속
docker exec -it $(docker ps -aq -f ancestor="my-mysql-image:1.0") mysql -uroot -p

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

## Database Postgres

