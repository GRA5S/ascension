# frozen_string_literal: true

Rails.application.config.after_initialize do
  posthog_key = Rails.application.credentials.dig(:posthog, :project_token) || ENV["POSTHOG_PROJECT_TOKEN"]
  posthog_host = Rails.application.credentials.dig(:posthog, :host) || ENV["POSTHOG_HOST"]

  if posthog_key.present?
    PostHog.init do |config|
      config.api_key = posthog_key
      config.host = posthog_host || 'https://us.i.posthog.com'
    end

    PostHog::Rails.configure do |config|
      config.auto_capture_exceptions = true
      config.report_rescued_exceptions = true
      config.auto_instrument_active_job = true
    end
  end

end

