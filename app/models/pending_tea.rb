class PendingTea < ApplicationRecord
    belongs_to :user
    validates :name, presence: true
    validates :oxidation, presence: true
    validate :unique_entry, :on => :create

    def unique_entry
      teas = []
      parr = PendingTea.all.pluck(:name, :aka)
      parr.each do |a|
        a.each do |n|
          teas << n.downcase.gsub(" ","") unless n.nil?
        end
      end
      tarr = Tea.all.pluck(:name, :aka)
      tarr.each do |a|
        a.each do |n|
          teas << n.downcase.gsub(" ","") unless n.blank?
        end
      end
      if teas.include?(name.downcase.gsub(" ",""))
          errors[:name] << "#{name} exists"
      end
      if teas.include?(aka.downcase.gsub(" ",""))
          errors[:aka] << "#{aka} exists"
      end
    end

    def name_post_count
        aka.nil? ? "#{name}" : "#{name}, AKA: #{aka}"
    end

    def klass
      'pending_teas'
    end
end
