CREATE TABLE [EXCELP&D].[dbo].[JobDocument] (
	jobDocumentID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	jobIDFK int NOT NULL UNIQUE,
	prodReady BIT NOT NULL,
	jobNotes varchar(500),
	phaseDate DATE,
	phone varchar(30),
	foreman varchar(30),
	superintendent varchar(50),
	optionCoordinator varchar(300),
	FOREIGN KEY (jobIDFK) REFERENCES [EXCELP&D].[dbo].[Jobs]([Job ID]) ON DELETE CASCADE
)