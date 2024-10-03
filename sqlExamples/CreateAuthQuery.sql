USE [EXCELP&D]
GO
/****** Object:  Table [dbo].[RefreshTokens]    Script Date: 9/19/2024 12:47:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RefreshTokens](
	[userIDFK] [int] NOT NULL,
	[token] [varchar](500) NULL,
	[dateCreated] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 9/19/2024 12:47:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[roleID] [int] IDENTITY(1,1) NOT NULL,
	[roleName] [varchar](50) NULL,
	[roleDescription] [varchar](250) NULL,
PRIMARY KEY CLUSTERED 
(
	[roleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 9/19/2024 12:47:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[userID] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](100) NULL,
	[firstName] [varchar](100) NULL,
	[lastName] [varchar](100) NULL,
	[password] [varchar](100) NULL,
	[phone] [varchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[userID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [unique_emails] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsersToRoles]    Script Date: 9/19/2024 12:47:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersToRoles](
	[roleIDFK] [int] NOT NULL,
	[userIDFK] [int] NOT NULL,
	[assignmentDate] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[roleIDFK] ASC,
	[userIDFK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[RefreshTokens] ADD  DEFAULT (getdate()) FOR [dateCreated]
GO
ALTER TABLE [dbo].[UsersToRoles] ADD  DEFAULT (getdate()) FOR [assignmentDate]
GO
ALTER TABLE [dbo].[RefreshTokens]  WITH CHECK ADD FOREIGN KEY([userIDFK])
REFERENCES [dbo].[Users] ([userID])
GO
ALTER TABLE [dbo].[UsersToRoles]  WITH CHECK ADD FOREIGN KEY([roleIDFK])
REFERENCES [dbo].[Roles] ([roleID])
GO
ALTER TABLE [dbo].[UsersToRoles]  WITH CHECK ADD FOREIGN KEY([userIDFK])
REFERENCES [dbo].[Users] ([userID])
GO
