Vagrant.configure("2") do |config|
  config.vm.box = "geerlingguy/ubuntu1604"
  config.vm.hostname = "developer.moneymaster.de"

  config.vm.network :private_network, ip: "192.168.42.15", auto_network: true, host_ip: "127.0.0.1"
  config.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=777,fmode=666"]
  config.vm.provision :shell, path: "vagrant/bootstrap.sh"

  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
    v.cpus = 1
    v.name = "MoneyMaster"
    v.customize ["modifyvm", :id, "--nictype1", "Am79C973"]
    v.customize ['modifyvm', :id, '--cableconnected1', 'on']
  end
end
