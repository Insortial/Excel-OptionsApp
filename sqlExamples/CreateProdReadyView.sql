CREATE VIEW prodreadylotsview AS
	SELECT LO.*, JO.prodReady
	FROM [EXCELP&D].[dbo].[Lot Order Details] AS LO
	LEFT JOIN [EXCELP&D].[dbo].JobOptions AS JO ON LO.[Job IDFK] = JO.jobIDFK
	WHERE (([Room ID] != 'Throughout') AND (JO.prodReady IS NULL OR JO.prodReady = 1))
			OR (([Room ID] = 'Throughout') AND (JO.throughoutIsLot = 1 AND JO.prodReady = 1)) ;