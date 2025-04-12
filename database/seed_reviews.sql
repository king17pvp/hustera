-- Xóa dữ liệu cũ để tránh trùng lặp
DELETE FROM course_reviews WHERE course_ID IN (1, 2, 3);

-- Thêm dữ liệu mẫu cho course_ID = 1
INSERT INTO course_reviews (course_ID, reviewer_ID, rating, review, rated_at) VALUES
(1, 1, 5, 'Great course! I learned a lot and the instructor was very clear.', '2023-09-10 15:30:00'),
(1, 2, 5, 'This course exceeded my expectations. The content is comprehensive and well-structured.', '2023-10-15 09:45:00'),
(1, 3, 5, 'Absolutely loved this course. Very practical examples.', '2023-11-20 14:20:00'),
(1, 4, 4, 'Good course but could use more examples in some sections.', '2023-12-05 10:10:00'),
(1, 5, 5, 'The instructor explains complex concepts in an easy-to-understand way.', '2024-01-12 16:05:00'),
(1, 6, 5, 'Very engaging content. I completed it in one week!', '2024-02-18 11:30:00'),
(1, 7, 4, 'Really helpful for beginners. Would recommend.', '2024-03-21 09:15:00'),
(1, 8, 5, 'Exactly what I needed to advance in my career.', '2024-04-02 13:45:00'),
(1, 9, 5, 'Well worth the price. Great value.', '2024-04-15 17:20:00');

-- Thêm dữ liệu mẫu cho course_ID = 2
INSERT INTO course_reviews (course_ID, reviewer_ID, rating, review, rated_at) VALUES
(2, 1, 4, 'Solid course with good explanations.', '2023-08-15 10:30:00'),
(2, 3, 5, 'One of the best courses I\'ve taken on this subject.', '2023-09-20 14:15:00'),
(2, 5, 4, 'Very detailed content, though some parts were a bit advanced.', '2023-10-25 11:45:00'),
(2, 7, 3, 'Good overall, but some sections need updating.', '2023-11-12 16:30:00'),
(2, 9, 5, 'Excellent course! I\'m recommending it to all my colleagues.', '2024-01-05 09:20:00');

-- Thêm dữ liệu mẫu cho course_ID = 3
INSERT INTO course_reviews (course_ID, reviewer_ID, rating, review, rated_at) VALUES
(3, 2, 5, 'Perfect introduction to the subject.', '2023-07-10 13:15:00'),
(3, 4, 5, 'Clear explanations and practical assignments.', '2023-08-22 15:40:00'),
(3, 6, 4, 'Very informative course. Helped me a lot with my project.', '2023-09-30 10:25:00'),
(3, 8, 5, 'Great pacing and structure. Learned a lot.', '2023-11-18 12:35:00'),
(3, 1, 2, 'The content is good but needs more real-world examples.', '2024-01-25 14:50:00'),
(3, 3, 4, 'Solid foundation in the subject matter.', '2024-03-10 11:10:00');
