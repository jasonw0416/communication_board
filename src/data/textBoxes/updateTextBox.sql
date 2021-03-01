UPDATE [textBox]
SET [categoryId] = @categoryId,
[writtenText] = @writtenText
WHERE [textBoxId] = @textBoxId
and [userId] = @userId

SELECT *
FROM [textBox]
WHERE [textBoxId] = @textBoxId