# Troubleshooting

## MongoDB Connection Error: `querySrv ECONNREFUSED`

If you are encountering the following error when trying to connect to MongoDB:

```
MongoDB Connection Error: Error: querySrv ECONNREFUSED _mongodb._tcp.cluster0.htzpq7b.mongodb.net ...
```

### The Cause
This error occurs because your local network environment (ISP, Router, Firewall, or VPN) is failing to perform the DNS SRV lookup required by the short `mongodb+srv://` connection string.

### The Fix
To fix this, you need to use the **Standard Connection String** which explicitly lists the database nodes, bypassing the need for the specific DNS lookup.

**Update your `.env` file with the following `MONGODB_URI`:**

```env
# Replace <username> and <password> with your actual credentials
MONGODB_URI=mongodb://<username>:<password>@ac-btxlrnv-shard-00-00.htzpq7b.mongodb.net:27017,ac-btxlrnv-shard-00-01.htzpq7b.mongodb.net:27017,ac-btxlrnv-shard-00-02.htzpq7b.mongodb.net:27017/?ssl=true&replicaSet=atlas-6lq670-shard-0&authSource=admin&appName=Cluster0
```

This string connects directly to the 3 shards of your cluster.

### Why this works
The `mongodb+srv://` protocol is a shortcut that asks the DNS server "Where are the nodes for this cluster?". If your DNS server blocks or fails this request, the connection fails. The standard `mongodb://` string provides the node addresses directly, so no special DNS lookup is needed.
