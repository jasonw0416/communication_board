DELETE [textBox]
WHERE [textBoxId] = @textBoxId
AND [userId] = @userId
DBCC CHECKIDENT (textBox, RESEED, @textBoxIdInc)
