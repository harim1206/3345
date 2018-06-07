class TrackSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :release
end
