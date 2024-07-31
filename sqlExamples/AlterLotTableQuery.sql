ALTER TABLE [EXCELP&D].[dbo].[Lot Order Details]
ADD
Details varchar(MAX),
Appliances varchar(MAX),
prodReady bit;

UPDATE [EXCELP&D].[dbo].[Lot Order Details]
SET prodReady = 1;
