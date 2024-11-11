CREATE PROCEDURE delete_CVJ
	(@jobID int, @jobName varchar(200))
AS
BEGIN
	SET NOCOUNT ON; 

	DECLARE @jobInfoID int;
	DECLARE @roomID int;
	DECLARE @cabinetID int;

	SELECT @jobInfoID = jobInfoID
	FROM CV_JobInfo
	WHERE jobIDFK = @jobID AND [Job Name] = @jobName;

	SELECT @roomID = RoomID
	FROM CV_Rooms
	WHERE jobInfoIDFK = @jobInfoID;

	SELECT @cabinetID = [Cabinet ID]
	FROM CV_Cabinets
	WHERE roomIDFK = @roomID;

	DELETE FROM [CV_Doors] WHERE cabinetIDFK = @cabinetID; 
	DELETE FROM [CV_Rollouts] WHERE cabinetIDFK = @cabinetID;
	DELETE FROM [CV_Sections] WHERE cabinetIDFK = @cabinetID;
	DELETE FROM [CV_StockCabinets] WHERE cabinetIDFK = @cabinetID;

	DELETE FROM [CV_Cabinets] WHERE roomIDFK = @roomID;
	DELETE FROM [CV_Molding] WHERE roomIDFK = @roomID;
	DELETE FROM [CV_Tops] WHERE roomIDFK = @roomID;

	DELETE FROM [CV_Rooms] WHERE jobInfoIDFK = @jobInfoID;

	DELETE FROM [CV_JobInfo] WHERE jobInfoID = @jobInfoID;
END
GO