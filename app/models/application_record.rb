class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def klass 
    if self.class == Tea 
      'teas'
    else 
      'pending_teas'
    end
  end

end
