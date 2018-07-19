class PendingTea < ApplicationRecord
    belongs_to :user
    validates :name, presence: true
    validates :oxidation, presence: true


    def name_post_count
        aka.nil? ? "#{name}" : "#{name}, AKA: #{aka}"
    end

    def klass
      'pending_teas'
    end
end
