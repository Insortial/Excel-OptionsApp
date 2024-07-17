SELECT J.[Job Name], LO.[Lot Number], L.*
FROM [EXCELP&D].[dbo].[Lot Order Details] AS L
INNER JOIN [EXCELP&D].[dbo].[Jobs] AS J 
	ON J.[Job ID] = L.[Job IDFK]
INNER JOIN [EXCELP&D].[dbo].[Lots] as LO
	ON L.[Lot ID] = LO.[Lot ID]
WHERE L.[Job IDFK] = 10147;