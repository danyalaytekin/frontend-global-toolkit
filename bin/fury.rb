#!/usr/bin/ruby

require 'rubygems'
require 'gemfury'
require 'json'

# retrieve @component packages from gemfury
# return: name, version

hash = ARGV[0]
client = Gemfury::Client.new(:user_api_key => hash)
packages = client.list.to_json
data = JSON.parse packages
results = {}

data.each do |hash|
  if hash["name"] =~ /^\@components/
    results[hash["name"]] = hash["latest_version"]["version"]
  end
end

p results.to_json
