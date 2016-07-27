(function(target) {
    
    var updateProject = function(name) {
        return name + ' is working on it.';
    };
    
    var Maintainer = function(name, email) {
        this.name = name;
        this.email = email;
    };
    
    Maintainer.prototype.maintain = function() {
        var self = this;
        return updateProject(self.name);
    };
    
    target.Maintainer = Maintainer;
    
}(projectA));
