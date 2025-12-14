// 관리자 권한으로 실행됨
db = db.getSiblingDB('testdb');

// 애플리케이션 사용자 생성
db.createUser({
  user: 'testuser',
  pwd: '1234',
  roles: [
    {
      role: 'readWrite',
      db: 'testdb'
    }
  ]
});

print('✅ User "testuser" created successfully');