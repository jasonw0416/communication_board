INSERT INTO [textBox] ([categoryId], [userId], [writtenText], [boxPrevious], [boxNext])
VALUES
(@categoryId, @userId, @writtenText, @boxPrevious, @boxNext)

SELECT SCOPE_IDENTITY() AS userId;