BEGIN TRANSACTION;
INSERT INTO users
(name, email, entries, joined)
VALUES
('asd', 'asd@asd.com', 0, '2018-07-22 00:05:27.381000');
INSERT INTO login
(hash, email)
VALUES
('$2a$10$IsyQkSLjoMg688eqYLyd2OjzYoSrsX0ot3knZpUHZjHMJhPYUxs2y', 'asd@asd.com');
COMMIT;