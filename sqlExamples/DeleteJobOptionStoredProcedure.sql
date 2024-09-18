CREATE PROCEDURE delete_job_option
	(@jobOptionID int)
AS
BEGIN
	DECLARE @jobID int;

	SELECT @jobID = jobIDFK
	FROM JobOptions
	WHERE jobOptionID = @jobOptionID;

	DELETE FROM [Lot Order Details] WHERE [Job IDFK] = @jobID;
	DELETE FROM LotOptions WHERE jobOptionIDFK = @jobOptionID;
	DELETE FROM JobOptions WHERE jobOptionID = @jobOptionID;
END