class TrackSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :release, :url, :description, :duration, :label, :catno, :resource_url
  belongs_to :playlist
end
