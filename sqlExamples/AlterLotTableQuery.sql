ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details]
ADD
details varchar(MAX),
appliances varchar(MAX)

UPDATE [EXCELP&D].[dbo].[Lot Order Details]
SET prodReady = 1;
