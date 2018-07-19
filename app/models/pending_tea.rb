class PendingTea < ApplicationRecord
    belongs_to :user
    validates :name, presence: true
    validates :oxidation, presence: true
    validate :uniue_entry

    def uniue_entry
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
          teas << n.downcase.gsub(" ","") unless n.nil?
        end
      end
      binding.pry
      if teas.include?(name.downcase.gsub(" ",""))
          record.errors[:name] << "#{name} already exists"
      else teas.include?(aka.downcase.gsub(" ",""))
          record.errors[:aka] << "#{aka} already exists"
      end
    end

    def name_post_count
        aka.nil? ? "#{name}" : "#{name}, AKA: #{aka}"
    end

    def klass
      'pending_teas'
    end
end
