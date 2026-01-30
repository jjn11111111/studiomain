-- Add test subscription for johnjeremynorman@gmail.com
INSERT INTO subscriptions (email, status, current_period_end)
VALUES ('johnjeremynorman@gmail.com', 'active', '2027-01-29T00:00:00.000Z')
ON CONFLICT (email) DO UPDATE SET
  status = 'active',
  current_period_end = '2027-01-29T00:00:00.000Z';
