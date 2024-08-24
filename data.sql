INSERT INTO users( username,password, email)
VALUES 
('lubas', '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'test@test.com'),
('lukas', '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'test@test.com'),
('lucas', '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'test@test.com'),
('lutas', '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'test@test.com'),
('lumas', '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q', 'test@test.com');

INSERT INTO meals(user_id, name, calories, day, time)
VALUES 
(1, 'steak', 200, 'sunday', 'dinner'),
(1, 'chicken', 400, 'sunday', 'lunch'),
(1, 'pork chops', 600, 'monday', 'dinner'),
(1, 'pasta', 400, 'monday', 'lunch'),
(1, 'eggs', 200, 'sunday', 'breakfast');