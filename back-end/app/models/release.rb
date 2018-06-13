class Release < ApplicationRecord
  belongs_to :playlist, optional: true

end
