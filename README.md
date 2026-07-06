# Ascension site

the site for the unreleased ascension YSWS

it uses sam liu's [Hack Club Rails Starter Template](https://github.com/samdev-7/hc-rails-starter) 

currently part of it is hosted at https://ascension.hackclub.com but like i said its not released and not finished yet so a lot of this isnt

###### (praying hctg reviewers dont slime me out for that... im sowwy i just wanted to ship cuz hctg is ending 🥺)

## Demo:

https://github.com/user-attachments/assets/425f4aac-d3a2-4210-99e0-b133c98dc53e
###### ignore the shitty devlog images i swear it looked better before idk what changed ill fix that
###### also the explore page is unimplemented thats intentional not an error


## how to run:

### 1. Prerequisites

- Ruby (see `.ruby-version` or Gemfile)
- Node.js (for Vite and frontend dependencies)
- Bundler (`gem install bundler`)
- Docker (for running Postgres)

### 2. Start Postgres with Docker

You can spin up a local Postgres instance using Docker:

```sh
docker run -d \
  --name hc-rails-starter-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=starter \
  -e POSTGRES_DB=hc_rails_starter_development \
  -p 5432:5432 \
  postgres:15
```

Update your `.env` file with the database URL:

```
DATABASE_URL=postgresql://postgres:starter@localhost:5432/hc_rails_starter_development
```

### 3. Install dependencies

```sh
bundle install
npm install
```

### 4. Setup credentials

The template ships with a placeholder `config/credentials.yml.enc`. Delete it and generate fresh credentials for your project:

```sh
rm config/credentials.yml.enc
bin/rails credentials:edit
```

Then generate Active Record encryption keys and paste them into the credentials file:

```sh
bin/rails db:encryption:init
```

Copy the output into your credentials file so it looks like:

```yaml
active_record_encryption:
  primary_key: <generated>
  deterministic_key: <generated>
  key_derivation_salt: <generated>
```

This creates `config/master.key` (keep this secret, never commit it) and a new `config/credentials.yml.enc`.

### 5. Setup the database

```sh
bin/rails db:setup
```

### 6. Start the Rails server

```sh
bin/dev
```

### Cloudflare R2 (Production)

Active Storage is configured to use Cloudflare R2 in production. Development uses local disk storage by default. To set up R2 for production, create an R2 bucket and API token in the Cloudflare dashboard, then set these environment variables:

```
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
R2_BUCKET=your_bucket_name
R2_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
```

---

See `.env.development.example` for required environment variables.


##### The site was submitted to [HCTG](https://game.hackclub.com/)
