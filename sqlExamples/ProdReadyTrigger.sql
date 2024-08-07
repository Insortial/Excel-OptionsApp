CREATE TRIGGER updateProdReady ON [EXCELP&D].[dbo].[JobOptions] 
FOR INSERT, UPDATE
AS 
BEGIN
	UPDATE [EXCELP&D].[dbo].[Lot Order Details]
		SET prodReady = inserted.prodReady
		FROM inserted
		WHERE [EXCELP&D].[dbo].[Lot Order Details].[Job IDFK] = inserted.jobIDFK
END;
