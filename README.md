# PinealVision Studio — 3rd-Eye Cross-Trainer 🧠🇺🇸

**LIVE on sovereign New Jersey steel**  
IP: **45.77.206.96**  
Dashboard: https://45.77.206.96/_/ (admin / pineal2025)  

### One-line boot (copy-paste)
```bash
ssh root@45.77.206.96 "curl -fsSL https://raw.githubusercontent.com/garkimasera/3rdeye-migrate/main/nj.sh | bash"
apt update && apt install -y socat
~/.acme.sh/acme.sh --issue -d 45.77.206.96 --standalone --keylength ec-256
~/.acme.sh/acme.sh --install-cert -d 45.77.206.96 --ecc \
  --fullchain-file /pb_data/fullchain.pem \
  --key-file /pb_data/privkey.pem
pkill pocketbase ; sleep 2
nohup /usr/local/bin/pocketbase serve \
  --http=0.0.0.0:80 \
  --https=0.0.0.0:443 \
  --cert=/pb_data/fullchain.pem \
  --key=/pb_data/privkey.pem \
  > /pb_data/pb.log 2>&1 &
