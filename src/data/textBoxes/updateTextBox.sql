UPDATE [textBox]
SET [categoryId] = @categoryId,
[writtenText] = @writtenText,
[boxNext] = @boxNext,
[boxPrevious] = @boxPrevious
WHERE [textBoxId] = @textBoxId
and [userId] = @userId

SELECT *
FROM [textBox]
WHERE [textBoxId] = @textBoxId