select
  *
from
  (
    Select
      *
    from
      Posts
    where
      category = 'Recipes'
    order by
      ID Desc
    Limit
      1
  ) as a
UNION All
select
  *
from
  (
    Select
      *
    from
      Posts as p2
    where
      category = 'MomToolsAndTips'
    order by
      ID Desc
    Limit
      1
  ) as a
UNION All
select
  *
from
  (
    Select
      *
    from
      Posts as p3
    where
      category = 'Fitness'
    order by
      ID Desc
    Limit
      1
  ) as a
UNION All
select
  *
from
  (
    Select
      *
    from
      Posts as p4
    where
      category = 'Salutes'
    order by
      ID Desc
    Limit
      1
  ) as a
UNION All
select
  *
from
  (
    Select
      *
    from
      Posts as p5
    where
      category = 'Parenting'
    order by
      ID Desc
    Limit
      1
  ) as a;