CREATE TABLE [EXCELP&D].[dbo].[JobOptions] (
	jobOptionID int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	jobIDFK int NOT NULL UNIQUE,
	jobNotes varchar(MAX),
	phaseDate DATE,
	phone varchar(30),
	superintendent varchar(50),
	optionCoordinator varchar(100),
	FOREIGN KEY (jobIDFK) REFERENCES [EXCELP&D].[dbo].[Jobs]([Job ID]) ON DELETE CASCADE
)