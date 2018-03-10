UPDATE Users
SET FirstName   = $2,
    LastName    = $3,
    isAdmin     = $4,
    isSuperUser = $5,
WHERE UserID    = $1
