# frozen_string_literal: true

require "loops_sdk"

loops_api_key = Rails.application.credentials.dig(:loops, :api_key) || ENV["LOOPS_API_KEY"]

if loops_api_key.present?
  LoopsSdk.configure do |config|
    config.api_key = loops_api_key
  end
end
