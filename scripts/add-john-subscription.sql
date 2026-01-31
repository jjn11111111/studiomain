-- Add subscription for johnjeremynorman@gmail.com
INSERT INTO subscriptions (email, status, current_period_end)
VALUES ('johnjeremynorman@gmail.com', 'active', '2027-01-31 00:00:00+00')
ON CONFLICT (email) DO UPDATE SET
  status = 'active',
  current_period_end = '2027-01-31 00:00:00+00';
