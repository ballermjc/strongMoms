UPDATE Posts
SET Title   = $2,
    Body    = $3,
    Category= $4,
    Photo   = $5
WHERE ID= $1;